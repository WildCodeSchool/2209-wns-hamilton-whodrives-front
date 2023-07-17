import "../../styles/global.css";

interface IMessageProps {
  messageCongrats: string;
}

export default function CongratulationsPage({
  messageCongrats,
}: IMessageProps): JSX.Element {
  return (
    <div className="flex flex-col items-center mt-16">
      <h3 className="congrats-title">FELICITATIONS !</h3>
      <img
        src="/assets/images/yellow-car.png"
        alt=""
        className="w-1/2 h-auto"
      />
      <h4>{messageCongrats}</h4>
      <p></p>
      <p></p>
    </div>
  );
}
