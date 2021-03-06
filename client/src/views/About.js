import React from 'react'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const About = () => {
  return (
    <Row className='mt-5 mx-0'>
      <Col className='text-center'>
        <Button
          variant='primary'
          href='https://www.linkedin.com/in/nguyễn-đức-hiếu-311688142'
          size='lg'
          as='a'
          target='_blank'
        >
          Visit my LinkedIn page for more information
        </Button>
      </Col>
    </Row>
  )
}

export default About
