import React, { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap'
import Rating from "../components/Rating"

import {useDispatch, useSelector} from 'react-redux'
import {listProductDetails} from "../actions/productActions";
import Loader from "../components/Loader";
import Message from "../components/Message";

const ProductScreen = () => {
  const [qty, setQty] = useState(1)
  const params = useParams()
  const dispatch = useDispatch()
  const productDetails = useSelector(state => state.productDetails)
  const { loading, error, product } = productDetails
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(listProductDetails(params.id))
  }, [dispatch, params])

  const addToCartHandler = () => {
    navigate(`/cart/${params.id}?qty=${qty}`)
  }

  return (
    <>
      <Link className='btn btn-light my-3' to="/">Go Back</Link>
      { loading ? <Loader/> : error ? <Message variant='danger' children={error}/> : <Row>
        <Col md={6}>
          <Image src={product.image} alt={product.name} fluid></Image>
        </Col>

        <Col md={3}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h3>{product.name}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating value={product.rating} text={`${product.numReviews} Reviews`}/>
            </ListGroup.Item>
            <ListGroup.Item>
              Price: {product.price}
            </ListGroup.Item>

            <ListGroup.Item>
              Discription: {product.description}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <Row>
                  <Col>Price</Col>
                  <Col><strong>{product.price}</strong></Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Status</Col>
                  <Col>
                    {product.countInStock > 0 ? "In Stock" : "Out Of Stock"}
                  </Col>
                </Row>
              </ListGroup.Item>

              {product.countInStock > 0 && (
                  <ListGroup.Item>
                    <Row>
                      <Col>Qty</Col>
                      <Col>
                        <Form.Control as='select' value={qty} onChange={(e) => setQty(e.target.value)}>

                          {[...Array(product.countInStock).keys()].map( x => (
                            <option key={x + 1} value={x + 1}>{ x + 1}</option>
                          ))}

                        </Form.Control>

                      </Col>
                    </Row>
                  </ListGroup.Item>
              )}


              <ListGroup.Item>
                <Button onClick={addToCartHandler} className='btn-block' type='button' disabled={product.countInStock === 0}>
                  Add to Cart
                </Button>
              </ListGroup.Item>

            </ListGroup>
          </Card>
        </Col>
      </Row>}

    </>
  )
}

export default ProductScreen
