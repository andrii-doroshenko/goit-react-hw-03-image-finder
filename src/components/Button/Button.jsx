import CSS from './Button.module.css';

export const Button = ({ onClick, children }) => (
  <button onClick={onClick} className={CSS.loadMore} type="button">
    {children}
  </button>
);
