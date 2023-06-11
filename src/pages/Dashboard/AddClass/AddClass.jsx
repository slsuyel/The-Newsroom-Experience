
import { useContext, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { AuthContext } from '../../../provider/AuthProviders';
import Swal from 'sweetalert2';

const AddClass = () => {
  const { user } = useContext(AuthContext);
  console.log(user);
  const [className, setClassName] = useState('');
  const [classImage, setClassImage] = useState(null); // Store the selected image file
  const [availableSeats, setAvailableSeats] = useState(0);
  const [price, setPrice] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!classImage) {
      // Handle the case where no image is selected
      return;
    }

    const formData = new FormData();
    formData.append('image', classImage);
    formData.append('key', '4395f7c9af68937afe51bf5aca708057');

    fetch('https://api.imgbb.com/1/upload', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        const imageUrl = data.data.display_url;

        const newClass = {
          className,
          classImage: imageUrl,
          instructorName: user?.displayName,
          photoURL: user?.photoURL,
          instructorEmail: user?.email,
          availableSeats,
          price,
          status: 'pending',
        };

        fetch('https://ass-12-server-eight.vercel.app/addclass', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newClass),
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.insertedId) {
              Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'You successfully added a new class',
                showConfirmButton: false,
                timer: 1500,
              });
              setClassName('');
              setClassImage(null);
              setAvailableSeats(0);
              setPrice(0);
            }
          })
          .catch((error) => {
            console.error('Error creating class:', error);
          });
      })
      .catch((error) => {
        console.error('Error uploading image:', error);
      });
  };

  return (
    <Form onSubmit={handleSubmit} className="bg-secondary-subtle font-monospace m-2 p-3 rounded">
      <Form.Group controlId="formClassName">
        <Form.Label>Class name:</Form.Label>
        <Form.Control type="text" value={className} onChange={(e) => setClassName(e.target.value)} required />
      </Form.Group>
      <Form.Group controlId="formClassImage">
        <Form.Label>Class image:</Form.Label>
        <Form.Control type="file" onChange={(e) => setClassImage(e.target.files[0])} required />
      </Form.Group>
      <Form.Group controlId="formInstructorName">
        <Form.Label>Instructor name:</Form.Label>
        <Form.Control type="text" value={user?.displayName} readOnly />
      </Form.Group>
      <Form.Group controlId="formInstructorEmail">
        <Form.Label>Instructor email:</Form.Label>
        <Form.Control type="text" value={user?.email} readOnly />
      </Form.Group>
      <Form.Group controlId="formAvailableSeats">
        <Form.Label>Available seats:</Form.Label>
        <Form.Control
          type="number"
          value={availableSeats}
          onChange={(e) => setAvailableSeats(parseInt(e.target.value))}
          required
        />
      </Form.Group>
      <Form.Group controlId="formPrice">
        <Form.Label>Price:</Form.Label>
        <Form.Control
          type="number"
          value={price}
          onChange={(e) => setPrice(parseFloat(e.target.value))}
          required
        />
      </Form.Group>
      <Button variant="primary" className='mt-3' type="submit">
        Add
      </Button>
    </Form>
  );
};

export default AddClass;
