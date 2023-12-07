import { useForm } from "react-hook-form";
import { Input } from "../../components";

const NewProduct = () => {
  const { register } = useForm({});
  return (
    <div>
      <Input name='supplierName' label='SupplierName' register={register} />
    </div>
  );
};

export default NewProduct;
