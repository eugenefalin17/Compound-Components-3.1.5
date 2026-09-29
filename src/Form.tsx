import {
  createContext,
  useContext,
  type ReactNode,
  type ComponentProps,
} from 'react';

type FormData = Record<string, string>;

type FormContextType = {
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
};

const FormContext = createContext<FormContextType | null>(null);

type FormProps = {
  children: ReactNode;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
};

type InputProps = {
  id: string;
  placeholder: string;
};

type ButtonProps = ComponentProps<'button'>;

const FormRoot = ({ children, setFormData }: FormProps) => {
  return (
    <FormContext.Provider value={{ setFormData }}>
      <form>{children}</form>
    </FormContext.Provider>
  );
};

const Input = ({ id, placeholder }: InputProps) => {
  const context = useContext(FormContext);

  if (!context) {
    throw new Error('Form.Input должен находиться внутри Form');
  }

  return (
    <input
      id={id}
      placeholder={placeholder}
      onChange={(event) => {
        context.setFormData((prev) => ({
          ...prev,
          [id]: event.target.value,
        }));
      }}
    />
  );
};

const Row = ({ children }: { children: ReactNode }) => {
  return <div className="form-row">{children}</div>;
};

const Button = ({ children, ...props }: ButtonProps) => {
  return (
    <button type="button" {...props}>
      {children}
    </button>
  );
};

export const Form = Object.assign(FormRoot, {
  Input,
  Row,
  Button,
});
