import { Home } from "./[...url]/page";

export default async function Page(): Promise<string | JSX.Element | null> {
  try {
    return await Home();
  } catch (error) {
    console.log("Error: ", error);
    return <div> No data found </div>;
  }
}
