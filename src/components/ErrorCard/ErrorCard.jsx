import CSS from './ErrorCard.module.css';

export const ErrorMessage = () => {
  return (
    <div className={CSS.error}>
      <p>Ooopsssss !!! Something went wrong. Or no matches were found!</p>
    </div>
  );
};
