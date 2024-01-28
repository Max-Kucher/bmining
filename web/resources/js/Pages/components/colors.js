import { Box, Container, Stack } from '@mui/material';
import { Seo } from '@/components/seo';
import { usePageView } from '@/hooks/use-page-view';
import { Previewer } from '@/sections/components/previewer';
import { Colors1 } from '@/sections/components/colors/colors-1';
import { Colors2 } from '@/sections/components/colors/colors-2';

const components = [
  {
    element: <Colors1 />,
    title: 'Main colors'
  },
  {
    element: <Colors2 />,
    title: 'Severity colors'
  }
];

const Page = () => {
  usePageView();

  return (
    <>
      <Seo title="Components: Colors" />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="lg">
          <Stack spacing={8}>
            {components.map((component) => (
              <Previewer
                key={component.title}
                title={component.title}
              >
                {component.element}
              </Previewer>
            ))}
          </Stack>
        </Container>
      </Box>
    </>
  );
};

export default Page;
