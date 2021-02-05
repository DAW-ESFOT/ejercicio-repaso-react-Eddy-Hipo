import React, {useState, useEffect} from "react";
import { Col, Image, Row, Typography, Button, Space} from 'antd';
import 'antd/dist/antd.css';
const { Title, Text } = Typography;

function Details(props) {

    const [book, setBook] = useState([]);

    useEffect(() => {
        const fetchBooks = async () => {
            const response = await fetch(
                "https://stark-spire-22280.herokuapp.com/api/books/" + props.id
            );
            const json = await response.json();
            console.log("json", json);
            setBook(json);
            return json;
        };
        fetchBooks();

    }, []);

    return (
        <>
            <Row gutter={16} type="flex" style={{alignItems: 'center'}}>
                <Col xs={24} sm={24} md={12} lg={12} span={12}>
                    <Space direction="vertical">
                        <Title level={4}><strong>Título: </strong>{book.title}</Title>
                        <Text><strong>autor: {book.author} </strong></Text>
                        <Text><strong>Año: </strong>{book.year_edition} </Text>
                        <Text><strong>Precio: </strong>${book.price} </Text>
                        <Text><strong>Synopsis: </strong>{book.synopsis} </Text>
                        <Text><strong>Disponible: </strong>{
                            book.available
                                ? ' Sí'
                                : ' No'
                        }</Text>
                        <Text><strong>Categoria: </strong>{ book.category} </Text>
                    </Space>
                </Col>
                <Col  xs={24} sm={24} md={8} lg={8} span={8}>
                    <Image
                        src={book.cover_page}
                    />
                </Col>
                <Col xs={24} sm={24} md={4} lg={4} span={4} >
                    <Image
                        src={book.back_cover}
                    />
                </Col>
                <Row>
                    <Col>
                        <Button type="primary"
                                onClick={props.onCancel}>
                            Regresar
                        </Button>
                    </Col>
                </Row>
            </Row>

        </>
    );
}

export default Details;