import { Box, Container } from '@mui/material';
import { Seo } from '@/components/seo';
import { usePageView } from '@/hooks/use-page-view';
import { Previewer } from '@/sections/components/previewer';
import { Typography1 } from '@/sections/components/typography/typography-1';

const Page = () => {
  usePageView();

  return (
    <>
      <Seo title="Components: Typography" />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="lg">
          <Previewer title="Typography">
            <Typography1 />
          </Previewer>
        </Container>
      </Box>
    </>
  );
};

export default Page;
