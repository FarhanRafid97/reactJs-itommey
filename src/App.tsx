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
import { format } from 'date-fns';
function App() {
  const {
    data,
    toast: toastState,
    loading,
  } = useAppSelector((state) => state.products);
  const dispatch = useAppDispatch();
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
          title: 'Product Deleted!!',
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
      name: 'Quantity',
      selector: (row: ProductType) => row.qty,
      sortable: true,
    },
    {
      name: 'Expired At',
      selector: (row: ProductType) =>
        format(new Date(row.expiredAt), 'yyyy-MM-dd'),
      sortable: true,
    },
    {
      name: 'Created At',
      selector: (row: ProductType) =>
        format(new Date(row.createdAt as string), 'yyyy-MM-dd'),
      sortable: true,
    },
    {
      name: 'Updated At',
      selector: (row: ProductType) =>
        format(new Date(row.updatedAt as string), 'yyyy-MM-dd'),
      sortable: true,
    },
    {
      name: 'Action',
      cell: (row: ProductType, index: number) => (
        <Flex columnGap="15px">
          <UpdateProductModal data={row} index={index} loading={loading} />
          <DeleteModal id={row.id} index={index} />
        </Flex>
      ),
    },
  ];

  return (
    <Box className="App" w="full" m="auto" mt={4}>
      <Box w="90%" m="auto" py={12}>
        <Flex
          justifyContent="space-between"
          mb={4}
          alignItems="center"
          gap="15px"
          direction={['column', 'row', 'row', 'row']}
        >
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
