import onenoteImg from '@/images/photos/articles/onenote.gif';
import { Article } from '../types';

const onenotePage: Article = {
  id: 'onenote',
  date: '2023-02-24',
  leading: 'Product',
  title: 'OneNote',
  description: 'Microsoft OneNote is a digital note-taking application that allows users to create, organize, and share notes. It is part of the Microsoft Office suite of productivity tools. OneNote is designed to mimic the experience of taking notes in a physical notebook and provides a flexible and interactive canvas for users to capture and organize information.',
  content: [
    {
      type: 'image',
      data: onenoteImg.src,
    },
    {
      type: 'text',
      data: 'Image source: https://techcommunity.microsoft.com/t5/education-blog/new-layout-options-for-onenote-on-windows-are-coming-soon/ba-p/3691211',
    },
    {
      type: 'text',
      data: '**In progress**',
    },
  ],
};

export default onenotePage;
