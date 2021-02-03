import {Card, Image, Col, Row, Button, Modal} from 'antd';
import '../styles/App.css';
import 'antd/dist/antd.css';
import React, {useEffect, useState} from 'react';

function App() {

    const [books, setBooks] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

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
                    {books.map((book) => (
                        <Col span={8}>
                            <Card>
                                <Row gutter={24}>
                                    <Col span={5}>
                                        <Image
                                            src={book.cover_page}
                                        />
                                    </Col>
                                    <Col span={19}>
                                        <div><strong>Título: </strong>{book.title} </div>
                                        <div><strong>Autor: </strong>{book.author} <strong>- Año: </strong>{book.year_edition}</div>
                                        <div><strong>Precio: </strong>{book.price}</div>
                                        <Button
                                            type='primary'
                                            className={'buttons'}
                                            onClick={showModal}
                                        >
                                            Ver más
                                        </Button>
                                        <Modal title="Libro" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                                            <p><strong>Titulo: </strong> {book.title}</p>
                                            <p><strong>Autor: </strong> {book.author}</p>
                                            <p><strong>Precio: </strong> ${book.price}</p>
                                            <p><strong>Páginas: </strong> {book.pages}</p>
                                            <p><strong>Editorial: </strong> {book.editorial}</p>
                                            <p><strong>Año de Edición: </strong> {book.year_edition}</p>
                                            <p><strong>Sinopsis: </strong> {book.synopsis}</p>
                                            <p>
                                                <strong>Estado: </strong>
                                                {
                                                    book.new
                                                        ? ' Nuevo'
                                                        : ' Usado'
                                                }

                                            </p>
                                            <p>
                                                <strong>Disponible: </strong>
                                                {
                                                    book.available
                                                        ? ' Si'
                                                        : ' No'
                                                }
                                            </p>
                                            <p><strong>Categoria: </strong> {book.category}</p>
                                        </Modal>
                                    </Col>
                                </Row>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </div>
        </>
    );
}

export default App;
