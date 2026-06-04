import { editor } from '@inquirer/prompts';
// Or
// import editor from '@inquirer/editor';

const answer = await editor({
  message: 'Enter a description',
});