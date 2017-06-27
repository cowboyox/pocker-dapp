import { configure } from '@storybook/react';

function loadStories() {
  require('../app/components/TableMenu/stories');
  require('../app/components/ActionBar/tests/stories');
  require('../app/components/Slider/tests/stories');
}

configure(loadStories, module);
