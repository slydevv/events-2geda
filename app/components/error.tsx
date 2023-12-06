type Props = {
  message: string | undefined;
};

export default function Error({ message }: Props) {
  return (
    <div data-test="error-message" className="text-red-600 text-sm">
      {message}
    </div>
  );
}
