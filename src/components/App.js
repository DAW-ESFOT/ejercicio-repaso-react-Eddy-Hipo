import {Row, Pagination, Space} from 'antd';
import '../styles/App.css';
import 'antd/dist/antd.css';
import React, {useEffect, useState} from 'react';
import CardBook from "./Card";

function App() {

    const [books, setBooks] = useState([]);
    const [pageInfo, setPageInfo]= useState([]);
    const [url, setUrl] = useState("https://stark-spire-22280.herokuapp.com/api/books")

    useEffect(() => {
        const fetchBooks = async () => {
            const response = await fetch(
                "" + url
            );
            const json = await response.json();
            console.log("json", json);
            setBooks(json.data);
            setPageInfo(json.meta)
            return json;
        };

        fetchBooks();
    }, [url] );


    const handleChangeUrl = (current) => {
        setUrl(pageInfo.links[current].url);
    }

    useEffect(() => {
        const fetchBooks = async () => {
            const response = await fetch(
                "https://stark-spire-22280.herokuapp.com/api/books"
            );
            const json = await response.json();
            console.log("json", json);
            setBooks(json.data);
            return json;
        };

        fetchBooks();
    }, []);

    return (
        <>
        <h1><div align="center">Venta de Libros</div></h1>
            <div className="site-card-wrapper">
                <Row gutter={24}>
                    {
                        books.map((book) => (
                                <CardBook
                                    key={book.id}
                                    book={book}/>
                            )
                        )}
                </Row>
            </div>
            <div className="space-align-block" align="center">
                <Space>
                    <Pagination
                        defaultCurrent={pageInfo.current_page}
                        total={pageInfo.total}
                        onChange={handleChangeUrl}/>
                </Space>
            </div>
        </>

    );
}

export default App;
