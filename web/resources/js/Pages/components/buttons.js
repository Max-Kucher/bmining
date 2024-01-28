import { Box, Container, Stack } from '@mui/material';
import { Seo } from '@/components/seo';
import { usePageView } from '@/hooks/use-page-view';
import { Previewer } from '@/sections/components/previewer';
import { Buttons1 } from '@/sections/components/buttons/buttons-1';
import { Buttons2 } from '@/sections/components/buttons/buttons-2';
import { Buttons3 } from '@/sections/components/buttons/buttons-3';

const components = [
  {
    element: <Buttons1 />,
    title: 'Simple buttons'
  },
  {
    element: <Buttons2 />,
    title: 'Buttons with text and icon'
  },
  {
    element: <Buttons3 />,
    title: 'Button groups'
  }
];

const Page = () => {
  usePageView();

  return (
    <>
      <Seo title="Components: Buttons" />
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
