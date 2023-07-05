
import Profile from "../Profile";

function Chiefs() {

  return (
    <>
      <div className="grid justify-center mb-16">
        <Profile />
      </div>
      <div className="flex justify-evenly mx-20 mb-28">
        <Profile />
        <Profile />
        <Profile />
        <Profile />
      </div>
    </>
  );
}

export default Chiefs;
