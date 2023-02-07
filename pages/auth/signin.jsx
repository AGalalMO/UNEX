import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Authentication from '~/src/components/auth';

function SignIn(props) {
  return <Authentication />;
}

export const getStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
};

export default SignIn;
