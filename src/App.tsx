import { useToast, Heading, Box, Flex, Image } from '@chakra-ui/react';
import { useEffect } from 'react';
import DataTable from 'react-data-table-component';
import AddProductModal from './components/AddProductModal';
import DeleteModal from './components/DeleteModal';
import UpdateProductModal from './components/UpdateProductModal';
import { getProductAction } from './store/actions/productAction';
import { useAppDispatch, useAppSelector } from './store/hooks/hook';
import { ToastType } from './store/types/actionType';
import { ProductType } from './store/types/product';

function App() {
  const {
    data,
    toast: toastState,
    loading,
  } = useAppSelector((state) => state.products);
  const dispatch = useAppDispatch();
  console.log(data);
  const toast = useToast();

  useEffect(() => {
    dispatch(getProductAction());
  }, [dispatch]);

  useEffect(() => {
    switch (toastState) {
      case ToastType.TOAST_SUCCESS_ADD:
        toast({
          title: 'Product Added!!',
          status: 'success',
          position: 'top',
          duration: 4000,
          isClosable: true,
        });
        return;
      case ToastType.TOAST_SUCCESS_UPDATE:
        toast({
          title: 'Product Updated!!',
          status: 'info',
          position: 'top',
          duration: 4000,
          isClosable: true,
        });
        return;
      case ToastType.TOAST_SUCCESS_DELETE:
        toast({
          title: 'Product Deleted',
          status: 'error',
          position: 'top',
          duration: 9000,
          isClosable: true,
        });
        return;
      case ToastType.TOAST_FAILED:
        toast({
          title: 'Failed Update Product',
          status: 'error',
          position: 'top',
          duration: 9000,
          isClosable: true,
        });
        return;

      default:
        return;
    }
  }, [toast, toastState]);

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
          <UpdateProductModal data={row} loading={loading} />
          <DeleteModal id={row.id} />
        </Flex>
      ),
    },
  ];

  return (
    <Box className="App" w="full" m="auto" mt={4}>
      <Box w={['80%', '80%', '80%', '90%']} m="auto" py={12}>
        <Flex justifyContent="space-between" mb={4}>
          <Heading>List Product</Heading>
          <AddProductModal loading={loading} />
        </Flex>
        <DataTable
          columns={columns as any}
          data={data}
          pagination
          progressPending={loading && data.length === 0}
        />
      </Box>
    </Box>
  );
}

export default App;
