type AuthHeaderProps = {
    heading: string;
    subHeading: string;
};

export const AuthHeader = ({ heading, subHeading }: AuthHeaderProps) => {
  return (
    <>
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
        {heading}
      </h2>
      <p className="md:text-md text-base text-gray-500 mb-8">
        {subHeading}
      </p>
    </>
  );
};
