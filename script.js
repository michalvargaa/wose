document.addEventListener('DOMContentLoaded', async () => {
  // grab html elements
  let textEl = document.querySelector("input[type='text']");
  let submit = document.querySelector("input[type='submit']");
  let editEl = document.querySelector("input[type='button']");
  let continueEl = document.querySelector('.continue');
  const radioEl = Array.from(document.querySelectorAll("input[type='radio']"));

  const enginesEl = Array.from(document.querySelectorAll('.edit-engines'));

  // initialize variables
  const engines = ['google', 'bing', 'yahoo', 'duckduckgo', 'ecosia','youtube'];
  const colors = [
    ['#DADCE0', 'grey'],
    ['#8AB4F8', 'blue'],
    ['#F28B82', 'red'],
    ['#FDD663', 'yellow'],
    ['#81C995', 'green'],
    ['#FF8BCB', 'pink'],
    ['#C58AF9', 'purple'],
    ['#78D9EC', 'cyan'],
    ['#FCAD70', 'orange'],
  ];

  let selectedEngines = [];

  await chrome.storage.sync.get('engines').then((data) => {
    selectedEngines =
      data['engines'] === undefined ? [...engines] : data['engines'];
  });

  // set custom colors to each radio button
  radioEl.forEach((radio, idx) => {
    radio.style.setProperty('--color', colors[idx][0]);

    radio.addEventListener('click', () => {
      // dynamically change color of ui
      document
        .querySelector('h1')
        .style.setProperty('--primary-color', colors[idx][0]);
      document
        .querySelector("input[type='text']")
        .style.setProperty('--primary-color', colors[idx][0]);
      document
        .querySelector("input[type='submit']")
        .style.setProperty('--primary-color', colors[idx][0]);
      document
        .querySelector('.continue')
        .style.setProperty('--primary-color', colors[idx][0]);
      document
        .querySelectorAll('#engine-visualizer-label')
        .forEach((label) =>
          label.style.setProperty('--primary-color', colors[idx][0])
        );
      document
        .querySelector('footer p a')
        .style.setProperty('--primary-color', colors[idx][0]);
    });
  });

  // change selected engine visualizer
  document.querySelector('#engine-visualizer-label').textContent =
    selectedEngines.length === 6
      ? 'All'
      : [
          ...selectedEngines.map(
            (engine) => engine.charAt(0).toUpperCase() + engine.slice(1)
          ),
        ].join(', ');

  enginesEl.map(
    (engine) =>
      (engine.checked = selectedEngines.includes(engine.id) ? true : false)
  );

  // listen on 'click' on edit selected search engines
  editEl.addEventListener('click', (e) => {
    e.preventDefault();

    // change content
    document.querySelector('#intro').className = 'hidden';
    document.querySelector('#search-engines').className = 'block';

    continueEl.addEventListener('click', (e) => {
      e.preventDefault();

      selectedEngines = enginesEl
        .filter((engine) => engine.checked)
        .map((engine) => engine.id);

      // check if at least one engine is selected;
      if (selectedEngines.length === 0) {
        document.querySelector('.error').className = 'visible error';
        return;
      }

      // change content
      document.querySelector('#intro').className = 'block';
      document.querySelector('#search-engines').className = 'hidden';
      document.querySelector('.error').className = 'hidden';

      // save selected engines to sync storage
      chrome.storage.sync.set({ engines: [...selectedEngines] });

      // change selected engine visualizer
      document.querySelector('#engine-visualizer-label').textContent =
        selectedEngines.length === 6
          ? 'All'
          : [
              ...selectedEngines.map(
                (engine) => engine.charAt(0).toUpperCase() + engine.slice(1)
              ),
            ].join(', ');

      return selectedEngines;
    });
  });

  // listen for 'click' event
  submit.addEventListener('click', async (e) => {
    e.preventDefault();

    // get query content
    const query = textEl.value;

    // validate query
    if (query === '') {
      textEl.style.border = '3px solid #DC143C';
      textEl.placeholder = 'Please, provide search query.';
      return;
    } else if (query.split(' ').length > 50) {
      textEl.style.border = '3px solid #DC143C';
      textEl.value = '';
      textEl.placeholder = 'Search query is too big.';
      return;
    }

    let tabsIds = [];
    let URL = '';
    for (const engine of selectedEngines) {
      switch (engine) {
        case 'yahoo':
          URL = `https://www.${engine}.com/search?p=${query}`;
          break;
        case 'duckduckgo':
          URL = `https://www.${engine}.com/?q=${query}`;
          break;
        case 'youtube':
          URL = `https://www.${engine}.com/results?search_query=${query}`;
          break;
        default:
          URL = `https://www.${engine}.${engine === 'ecosia' ? 'org' : 'com'}/search?q=${query}`;
          break;
      }

      // create new tabs without focusing on them
      const tab = await chrome.tabs.create({
        url: URL,
        selected: false,
        active: false,
      });

      tabsIds.push(tab.id);
    }

    // get selected color
    const checkedColorIdx = parseInt(
      radioEl.filter((radio) => radio.checked)[0].id
    );

    //

    // creating a group tab with the tab created
    const groupId = await chrome.tabs.group({ tabIds: tabsIds });
    //modifying the group tab
    await chrome.tabGroups.update(groupId, {
      collapsed: true,
      title: query,
      color: colors[checkedColorIdx][1],
    });
  });
});
