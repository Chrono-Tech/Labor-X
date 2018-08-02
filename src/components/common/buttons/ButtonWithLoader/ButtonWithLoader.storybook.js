import React from 'react';
import { storiesOf } from '@storybook/react';
import DeleteIcon from '@material-ui/icons/Delete'

import ButtonWithLoader from './ButtonWithLoader'

storiesOf('ButtonWithLoader')
  .add('text button with text', () => <ButtonWithLoader>Lorem Ipsum</ButtonWithLoader>)
  .add('text button with loader', () => <ButtonWithLoader loader>Lorem Ipsum</ButtonWithLoader>)
  .add('outlined button with text', () => <ButtonWithLoader variant='outlined'>Lorem Ipsum</ButtonWithLoader>)
  .add('outlined button with loader', () => <ButtonWithLoader variant='outlined' loader>Lorem Ipsum</ButtonWithLoader>)
  .add('contained button with text', () => <ButtonWithLoader variant='contained'>Lorem Ipsum</ButtonWithLoader>)
  .add('contained button with loader', () => <ButtonWithLoader variant='contained' loader>Lorem Ipsum</ButtonWithLoader>)
  .add('contained button with icon with text', () => <ButtonWithLoader variant='contained'><DeleteIcon/>Lorem Ipsum</ButtonWithLoader>)
  .add('contained button with icon with loader', () => <ButtonWithLoader variant='contained' loader><DeleteIcon/>Lorem Ipsum</ButtonWithLoader>)
  .add('extended fab button with text', () => <ButtonWithLoader variant='extendedFab'>Lorem Ipsum</ButtonWithLoader>)
  .add('extended fab button with loader', () => <ButtonWithLoader variant='extendedFab' loader>Lorem Ipsum</ButtonWithLoader>)
  .add('extended fab button with icon with text', () => <ButtonWithLoader variant='extendedFab'><DeleteIcon/>Lorem Ipsum</ButtonWithLoader>)
  .add('extended fab button with icon with loader', () => <ButtonWithLoader variant='extendedFab' loader><DeleteIcon/>Lorem Ipsum</ButtonWithLoader>)