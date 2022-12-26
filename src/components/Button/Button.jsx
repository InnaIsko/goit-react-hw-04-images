import PropTypes from 'prop-types';

export function Button({ onClickBtn }) {
  return (
    <button type="submit" className="button_LoadMore" onClick={onClickBtn}>
      Load more
    </button>
  );
}

Button.propTypes = {
  onClickBtn: PropTypes.func.isRequired,
};
