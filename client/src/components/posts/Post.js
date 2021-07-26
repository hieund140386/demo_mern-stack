import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import { courseStatus } from '../../context/constants';
import { ActionButtons } from './ActionButtons';

export const Post = ({ post: {
  _id,
  status,
  description,
  url,
  title
} }) => {
  return (
    <Card
      className="shadow"
      border={
        status === courseStatus.Learnt 
        ? 
        'success' 
        : status === courseStatus.Learning 
        ? 
        'warning' 
        : 'danger'
      }
    >
      <Card.Body>
        <Card.Title>
          <Row>
            <Col>
              <p className="post-title">{title}</p>
              <Badge 
                pill 
                bg={
                  status === courseStatus.Learnt
                  ?
                  "success"
                  : (status === courseStatus.Learning
                  ?
                  "warning"
                  : "danger")
                }
              >
                {status}
              </Badge>
            </Col>
            <Col className="text-right">
              <ActionButtons url={url} _id={_id} />
            </Col>
          </Row>
        </Card.Title>
        <Card.Text>
          {description}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}