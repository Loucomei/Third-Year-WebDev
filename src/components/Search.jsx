const Search = ({ changeFilter }) => {
    
    return (
        <div>
            <form id="form">
                <label htmlFor="searchBar"> Search:
                        <input type="text" id="search" name="search"
                        onChange={(e) => {
                            changeFilter(e.target.value.toLowerCase());
                        }}
                        />
                </label>
            </form>
        </div>
    )
}
export default Search;