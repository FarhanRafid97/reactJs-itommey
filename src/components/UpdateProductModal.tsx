import {
  Button,
  Flex,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Image,
} from '@chakra-ui/react';
import { PlusSquareIcon } from '@chakra-ui/icons';
import { EditIcon } from '@chakra-ui/icons';
import { useRef, useState } from 'react';
import { updateProductAction } from '../store/actions/productAction';
import { useAppDispatch } from '../store/hooks/hook';
import { ProductType, UpdateInputProductType } from '../store/types/product';

interface UpdateProductModalProps {
  data: ProductType;
  loading: boolean;
}

const UpdateProductModal: React.FC<UpdateProductModalProps> = ({
  data,
  loading,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const disptach = useAppDispatch();

  const [imageSrc, setImageSrc] = useState(data.picture);
  const [product, setProduct] = useState<UpdateInputProductType>({
    id: data.id,
    name: data.name,
    picture: data.picture,
    qty: data.qty,
    expiredAt: data.expiredAt,
  });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    disptach(updateProductAction(product));
  };

  const uploadFIle: any = useRef(null);
  const onBtnClick = () => {
    if (!uploadFIle.current) {
      return;
    }
    uploadFIle.current.click();
  };

  return (
    <>
      <Button colorScheme="telegram" onClick={onOpen}>
        <EditIcon />
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={onSubmit}>
              <Flex direction="column" rowGap="15px">
                <Input
                  required
                  placeholder="Basic usage"
                  value={product.name}
                  onChange={(e) =>
                    setProduct({ ...product, name: e.target.value })
                  }
                />

                <Input
                  required
                  placeholder="Basic usage"
                  type="number"
                  value={product.qty}
                  onChange={(e) =>
                    setProduct({ ...product, qty: Number(e.target.value) })
                  }
                />
                <Input
                  required
                  placeholder="Basic usage"
                  type="date"
                  value={product.expiredAt}
                  onChange={(e) =>
                    setProduct({ ...product, expiredAt: e.target.value })
                  }
                />

                <Button onClick={onBtnClick} colorScheme="telegram">
                  <PlusSquareIcon mr="5px" /> Upload Image
                </Button>
                {imageSrc && <Image src={imageSrc} w="50px" h="50px" />}
                <input
                  ref={uploadFIle}
                  style={{ display: 'none' }}
                  type="file"
                  id="inputImage"
                  onChange={(e) => {
                    e.preventDefault();
                    const reader = new FileReader();
                    if (!e.target.files) {
                      return setProduct({ ...product, picture: '' });
                    }
                    const file = e.target.files[0];

                    if (reader !== undefined && file !== undefined) {
                      reader.readAsDataURL(file);
                      reader.onloadend = (e) => {
                        setProduct({
                          ...product,
                          picture: reader.result as string,
                        });
                        setImageSrc(reader.result as string);
                      };
                    }
                  }}
                />
                <Flex columnGap="15px">
                  <label htmlFor="isActive">Product Active</label>
                  <input
                    id="isActive"
                    placeholder="Basic usage"
                    type="checkbox"
                    checked={data.isActive}
                    readOnly={true}
                  />
                </Flex>
              </Flex>
              <Button
                mt={4}
                w="full"
                colorScheme="whatsapp"
                isLoading={loading}
                type="submit"
              >
                Submit
              </Button>
            </form>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UpdateProductModal;
