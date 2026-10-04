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

type InputProps = ComponentProps<'input'> & {
  id: string;
};

type ButtonProps = ComponentProps<'button'>;

const FormRoot = ({ children, setFormData }: FormProps) => {
  return (
    <FormContext.Provider value={{ setFormData }}>
      <form>{children}</form>
    </FormContext.Provider>
  );
};

const Input = ({ id, onChange, ...props }: InputProps) => {
  const context = useContext(FormContext);

  if (!context) {
    throw new Error('Form.Input должен находиться внутри Form');
  }

  return (
    <input
      id={id}
      {...props}
      onChange={(event) => {
        context.setFormData((prev) => ({
          ...prev,
          [id]: event.target.value,
        }));

        onChange?.(event);
      }}
    />
  );
};

const Row = ({ children }: { children: ReactNode }) => {
  return <div className="form-row">{children}</div>;
};

const Button = ({ children, onClick, ...props }: ButtonProps) => {
  return (
    <button
      type="button"
      {...props}
      onClick={(event) => {
        const form = event.currentTarget.form;
        const inputs = form?.querySelectorAll('input');

        const emptyInput = Array.from(inputs ?? []).find(
          (input) => input.value.trim() === ''
        );

        if (emptyInput) {
          emptyInput.focus();
          alert('Заполни все поля');
          return;
        }

        onClick?.(event);
      }}
    >
      {children}
    </button>
  );
};

export const Form = Object.assign(FormRoot, {
  Input,
  Row,
  Button,
});
