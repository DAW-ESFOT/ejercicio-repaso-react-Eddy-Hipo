import React, {useState} from "react";
import {Card, Col, Modal, Row, Button, Image,  Space, Typography} from 'antd';
import BookDetails from "./Details";
import 'antd/dist/antd.css';
const { Title, Text } = Typography;

function CardB(props) {

    const [book, setBooks] = useState(props.book);
    const [isModalVisible, setIsModalVisible] = useState(false);


    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <>
            <Col  xs={24} sm={16} md={12} lg={8} span={8} >
                <Card
                    hoverable
                    style={{ width: 400 , height: 250, margin: 5}}
                >
                    <Row >
                        <Col span={10}>
                            <Image
                                width={130}
                                src={book.back_cover}
                            />
                        </Col>
                        <Col span={12}>
                            <Space direction="vertical">
                                <Title level={5}>{book.title}</Title>
                                <Text><strong>Autor: </strong>{book.author}<strong> - Año: </strong>{book.year_edition} </Text>
                                <Text><strong>Precio: </strong>${book.price} </Text>
                            </Space>
                        </Col>
                    </Row>
                    <Space>
                        <Button
                            type="primary"
                            onClick={()=>showModal()}>
                            Ver más
                        </Button>
                    </Space>
                </Card>
            </Col>
            <Modal
                title="Detalles del libro"
                visible={isModalVisible}
                onCancel={ handleCancel }
                width={750}
                footer={null}>
                <BookDetails id = {book.id}
                             onCancel = {handleCancel}/>
            </Modal>
        </>
    );
}

export default CardB;