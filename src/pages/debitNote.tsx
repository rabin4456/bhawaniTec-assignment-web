import { useEffect } from "react";
import { GlobalModal } from "../components";
import DebitNoteForm from "../forms/debitNote";
import { useNavigate } from "react-router-dom";

const DebitNote = () => {
  const navigate = useNavigate();

  const openDebitNoteModal = ({
    props,
    headingTitle = "New debit note",
  }: {
    props?: any;
    headingTitle?: string;
  }) => {
    GlobalModal.open({
      component: DebitNoteForm,
      headerClassName: "z-[99] bg-white  ",
      headerComponent: () => (
        <div className='flex flex-col gap-1 justify-start '>
          <h1 className='font-semibold'>{headingTitle}</h1>
        </div>
      ),
      modalSize: "screen",
      position: "bottom",
      onClose: () => navigate("/home"),
      contentClassName: "px-4 w-auto !important h-[100vh]",
      props: { ...props },
    });
  };

  useEffect(() => {
    openDebitNoteModal({ props: { onSuccess:()=> navigate("/home") } });
  }, []);
  return <></>;
};

export default DebitNote;
