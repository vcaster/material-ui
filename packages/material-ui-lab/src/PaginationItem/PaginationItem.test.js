import React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import { createMount, getClasses } from '@material-ui/core/test-utils';
import describeConformance from '@material-ui/core/test-utils/describeConformance';
import { createClientRender } from 'test/utils/createClientRender';
import PaginationItem from './PaginationItem';

describe('<PaginationItem />', () => {
  let classes;
  let mount;
  const render = createClientRender({ strict: false });

  before(() => {
    mount = createMount();
    classes = getClasses(<PaginationItem />);
  });

  describeConformance(<PaginationItem />, () => ({
    classes,
    inheritComponent: 'button',
    mount,
    refInstanceof: window.HTMLButtonElement,
    after: () => mount.cleanUp(),
  }));

  it('should render', () => {
    const { container } = render(<PaginationItem />);
    expect(container.firstChild).to.have.class(classes.root);
  });

  it('should add the `selected` class to the root element if `selected={true}`', () => {
    const { getByRole } = render(<PaginationItem selected />);

    expect(getByRole('button')).to.have.class(classes.selected);
  });

  describe('prop: disabled', () => {
    it('should add the `disabled` class to the root element if `disabled={true}`', () => {
      const { getByRole } = render(<PaginationItem disabled />);

      expect(getByRole('button')).to.have.class(classes.disabled);
    });

    it('should render a disabled button if `disabled={true}`', () => {
      const { getByRole } = render(<PaginationItem disabled />);

      expect(getByRole('button')).to.have.property('disabled', true);
    });
  });

  it('should render a small button', () => {
    const { getByTestId } = render(
      <PaginationItem data-testid="root" size="small" page={1}>
        Hello World
      </PaginationItem>,
    );

    const root = getByTestId('root');
    expect(root).to.have.class(classes.root);
    expect(root).to.have.class(classes.sizeSmall);
    expect(root).not.to.have.class(classes.sizeLarge);
  });

  it('should render a large button', () => {
    const { getByTestId } = render(
      <PaginationItem data-testid="root" size="large" page={1}>
        Hello World
      </PaginationItem>,
    );

    const root = getByTestId('root');
    expect(root).to.have.class(classes.root);
    expect(root).not.to.have.class(classes.sizeSmall);
    expect(root).to.have.class(classes.sizeLarge);
  });

  describe('prop: onClick', () => {
    it('should be called when clicked', () => {
      const handleClick = spy();
      const { getByRole } = render(<PaginationItem page={1} onClick={handleClick} />);

      getByRole('button').click();

      expect(handleClick.callCount).to.equal(1);
    });

    it('should be called with the button value', () => {
      const handleClick = spy();
      const { getByRole } = render(<PaginationItem page={1} onClick={handleClick} />);

      getByRole('button').click();

      expect(handleClick.callCount).to.equal(1);
      expect(handleClick.args[0][1]).to.equal(1);
    });
  });
});
