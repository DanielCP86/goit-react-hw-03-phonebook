import PropTypes from 'prop-types';

export const Filter = ({ onFilter }) => (
  <>
    <label htmlFor="filter">Find contacts by name</label>
    <input type="text" name="filter" onChange={onFilter} />
  </>
);

Filter.propTypes = {
  onFilter: PropTypes.func.isRequired,
};
