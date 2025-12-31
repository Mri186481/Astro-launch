type Props = {
  message: string;
};

export default function ErrorMessage({ message }: Props) {
  return (
    <div className="error-container">
      <h3>¡Ups! Algo salió mal</h3>
      <p>{message}</p>
    </div>
  );
}