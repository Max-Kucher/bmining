import { Box, Container, Stack } from '@mui/material';
import { Seo } from '@/components/seo';
import { usePageView } from '@/hooks/use-page-view';
import { Previewer } from '@/sections/components/previewer';
import { QuickStats1 } from '@/sections/components/quick-stats/quick-stats-1';
import { QuickStats2 } from '@/sections/components/quick-stats/quick-stats-2';
import { QuickStats3 } from '@/sections/components/quick-stats/quick-stats-3';
import { QuickStats4 } from '@/sections/components/quick-stats/quick-stats-4';
import { QuickStats5 } from '@/sections/components/quick-stats/quick-stats-5';
import { QuickStats6 } from '@/sections/components/quick-stats/quick-stats-6';
import { QuickStats7 } from '@/sections/components/quick-stats/quick-stats-7';
import { QuickStats8 } from '@/sections/components/quick-stats/quick-stats-8';
import { QuickStats9 } from '@/sections/components/quick-stats/quick-stats-9';

const components = [
  {
    element: <QuickStats1 />,
    title: 'Quick stats 1'
  },
  {
    element: <QuickStats2 />,
    title: 'Quick stats 2'
  },
  {
    element: <QuickStats3 />,
    title: 'Quick stats 3'
  },
  {
    element: <QuickStats4 />,
    title: 'Quick stats 4'
  },
  {
    element: <QuickStats5 />,
    title: 'Quick stats 5'
  },
  {
    element: <QuickStats6 />,
    title: 'Quick stats 6'
  },
  {
    element: <QuickStats7 />,
    title: 'Quick stats 7'
  },
  {
    element: <QuickStats8 />,
    title: 'Quick stats 8'
  },
  {
    element: <QuickStats9 />,
    title: 'Quick stats 9'
  }
];

const Page = () => {
  usePageView();

  return (
    <>
      <Seo title="Components: Quick Stats" />
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
