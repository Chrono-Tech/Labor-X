import React from 'react';
import { storiesOf, addDecorator } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, text, select, number, object, boolean } from '@storybook/addon-knobs';
import { center, maxWidth, minWidth } from './decorators';
import { Image, Widget, Action, Chip, Select, Input } from 'components/common';

addDecorator(withKnobs)

storiesOf('Widget', module)
  .addDecorator(maxWidth(400))
  .addDecorator(center)
  .add('normal', () => <Widget
      title={text('title', 'Complete Your Profile')}
      subtitle={text('subtitle', 'General')}
      actions={object('actions', [
        {
          href: '/',
          label: 'General profile',
          isLink: true,
        },
        {
          href: '/',
          label: 'Validate Your ID',
          firstIcon: Image.SETS.SHIELD_ERROR,
        },
        {
          href: '/',
          label: 'Validate Documents (Worker)',
          firstIcon: Image.SETS.SHIELD_ERROR,
          secondIcon: Image.SETS.MESSAGE_ERROR,
        }
      ])}
    >
      You may continue to use <strong>laborX</strong> network anonymous if you wish so. To open wider
      possibilities and access better Offers, Workers and Recruiters you may complete your profile by using
      links below.
    </Widget>)

storiesOf('Action', module)
  .addDecorator(minWidth(300))
  .addDecorator(maxWidth(400))
  .addDecorator(center)
  .add('normal', () => <Action
    item={object('item', {
        href: '/',
        label: 'General profile',
        isLink: true,
      }
    )}/>)
  .add('with icon before', () => <Action
    item={object('item', {
        href: '/',
        label: 'Validate Your ID',
        firstIcon: Image.SETS.SHIELD_ERROR
      }
    )}/>)
  .add('with icon before and after', () => <Action
    item={object('item', {
        href: '/',
        label: 'Validate Documents (Worker)',
        firstIcon: Image.SETS.SHIELD_ERROR,
        secondIcon: Image.SETS.MESSAGE_ERROR,
      }
    )}/>)
  .add('with badge icon', () => <Action
    item={object('item', {
        href: '/',
        label: 'Become Involved',
        firstIcon: {
          name: Image.ICONS.LOGO,
          color: Image.COLORS.RED,
        },
        counter: { value: 3 },
      }
    )}/>)

storiesOf('Image', module)
  .addDecorator(center)
  .add('help', () => <Image
    icon={text('icon', 'help_outline')}
    color={text('color', 'blue')}
  />)

storiesOf('Chip', module)
  .addDecorator(center)
  .add('normal', () => <Chip
    value={text('value', 'text on chip')}
    onRemove={object('onRemove', null)}
  />)

storiesOf('Select', module)
  .addDecorator(minWidth(200))
  .addDecorator(center)
  .add('normal', () => <Select />)

storiesOf('Input', module)
  .addDecorator(minWidth(200))
  .addDecorator(center)
  .add('normal', () => <Input
    label={text('label', 'label on input')}
    placeholder={text('placeholder', 'placeholder')}
    type={text('type', 'text')}
    mods={text('mods', Input.MODS.BOXED)}
  />)
