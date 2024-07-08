import { memo } from 'react';
import type { FC } from 'react';
import { Grid, GridItem } from '@chakra-ui/react'

interface Props {
  className?: string;
}

const AbstractRects: FC<Props> = memo(function AbstractRects(props = {}) {
  return (
    <Grid
      h="450px"
      w="550px"
      templateRows="repeat(9, 1fr)"
      templateColumns="repeat(8, 1fr)"
      gap={10}
    >
      <GridItem className='shadow-md' rowSpan={4} colSpan={5} bg="#54ACFD" borderRadius={10}/>
      <GridItem className='shadow-md' rowSpan={2} colSpan={3} bg="#D5E6FF" borderRadius={10}/>
      <GridItem className='shadow-md' rowSpan={3} colSpan={3} bg="#8DC1FF" borderRadius={10}/>
      <GridItem className='shadow-md' rowSpan={4} colSpan={3} bg="#D5E6FF" borderRadius={10}/>
      <GridItem className='shadow-md' rowSpan={2} colSpan={2} bg="#FFD99F" borderRadius={10}/>
      <GridItem className='shadow-md' rowSpan={3} colSpan={3} bg="#54ACFD" borderRadius={10}/>
      <GridItem className='shadow-md' rowSpan={2} colSpan={2} bg="#8DC1FF" borderRadius={10}/>
    </Grid>
  );
});

export default AbstractRects