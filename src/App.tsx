import { useState } from 'react';
import { Form } from './Form';
import './App.css';

function App() {
  const [formData, setFormData] = useState<Record<string, string>>({});

  const onSubmit = () => {
    console.log('formData', JSON.stringify(formData));
  };

  return (
    <Form setFormData={setFormData}>
      <Form.Row>
        <Form.Input id="name" placeholder="Имя" />
        <Form.Input id="surname" placeholder="Фамилия" />
      </Form.Row>
      <Form.Row>
        <Form.Input id="address" placeholder="Адрес" />
      </Form.Row>

      <Form.Button onClick={onSubmit}>Сохранить</Form.Button>
    </Form>
  );
}

export default App;
