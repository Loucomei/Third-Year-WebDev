import NavBar from"../components/NavBar";
import BooksList from "../books/BookList";

const BooksPage = ({ changeFilter }) => {
    return (
        <>
            <NavBar changeFilter={changeFilter}/>
            <BooksList />
        </>
    )
}

export default BooksPage
