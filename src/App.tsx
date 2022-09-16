import { Text, Box, Flex, Image } from '@chakra-ui/react';
import { useEffect } from 'react';
import DataTable from 'react-data-table-component';
import AddProductModal from './components/AddProductModal';
import DeleteModal from './components/DeleteModal';
import UpdateProductModal from './components/UpdateProductModal';
import { getProductAction } from './store/actions/productAction';
import { useAppDispatch, useAppSelector } from './store/hooks/hook';
import { ProductType } from './store/reducers/product';

function App() {
  const products = useAppSelector((state) => state.products);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getProductAction());
  }, [dispatch]);
  const columns = [
    {
      name: 'Id',
      selector: (row: ProductType) => row.id,
      sortable: true,
    },
    {
      name: 'Name',
      selector: (row: ProductType) => row.name,
      sortable: true,
    },
    {
      name: 'Picture',
      selector: (row: ProductType) => (
        <Box p="10px">
          <Image src={row.picture} width="50px" h="50px" />
        </Box>
      ),
    },
    {
      name: 'Expired at',
      selector: (row: ProductType) => row.expiredAt,
    },
    {
      name: 'Created At',
      selector: (row: ProductType) => row.createdAt,
    },
    {
      name: 'Created At',
      selector: (row: ProductType) => row.updatedAt,
    },
    {
      name: 'Action',
      cell: (row: ProductType) => (
        <Flex columnGap="15px">
          <UpdateProductModal data={row} />
          <DeleteModal id={row.id} />
        </Flex>
      ),
    },
  ];

  const data = products;

  return (
    <Box className="App" w="full" m="auto" mt={4}>
      <Box w={['80%', '80%', '80%', '90%']} m="auto" py={12}>
        <Flex justifyContent="space-between">
          <Text>List Product</Text>
          <AddProductModal />
        </Flex>
        <DataTable columns={columns as any} data={data} pagination />
      </Box>
    </Box>
  );
}

export default App;
