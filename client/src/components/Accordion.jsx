import React from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
 
function Icon({ id, open }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className={`${id === open ? "rotate-180" : ""} h-5 w-5 transition-transform`}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
    </svg>
  );
}
 
export default function AccordionCustomIcon() {
  const [open, setOpen] = React.useState(0);
 
  const handleOpen = (value) => setOpen(open === value ? 0 : value);
 
  return (
    <>
      <div className="flex flex-col">
      <Accordion open={open === 1} icon={<Icon id={1} open={open} />}>
        <AccordionHeader onClick={() => handleOpen(1)} className="text-md lg:text-lg">How do I register for an event?</AccordionHeader>
        <AccordionBody className=''>
        To register for an event, simply navigate to the event page and click on the event card. Then, fill out the required information.

        </AccordionBody>
      </Accordion>
      <Accordion open={open === 2} icon={<Icon id={2} open={open} />}>
      <AccordionHeader onClick={() => handleOpen(2)} className="text-md lg:text-lg">
        Are there discounts available for event registrations?
      </AccordionHeader>
      <AccordionBody className=''>
        Discounts are available based on the number of times you attend an event.
      </AccordionBody>
      </Accordion>
      <Accordion open={open === 3} icon={<Icon id={3} open={open} />}>
      <AccordionHeader onClick={() => handleOpen(3)} className="text-md lg:text-lg">
        What payment methods are accepted?
      </AccordionHeader>
      <AccordionBody className=''>
        We accept payments via GCash e-wallets. Cash payments may also be accepted for certain events.
      </AccordionBody>

      </Accordion>
      <Accordion open={open === 4} icon={<Icon id={4} open={open} />}>
      <AccordionHeader onClick={() => handleOpen(4)} className="text-md lg:text-lg">
        How can I get a refund?
      </AccordionHeader>
      <AccordionBody className=''>
      Refund policies vary depending on the event organizer. Please refer to the event page or contact the organizer directly for refund inquiries.
      </AccordionBody>
      </Accordion>
      <Accordion open={open === 5} icon={<Icon id={5} open={open} />}>
      <AccordionHeader onClick={() => handleOpen(5)} className="text-md lg:text-lg">
      How can I sponsor or donate to support the event?
      </AccordionHeader>
      <AccordionBody className=''>
      If you're interested in sponsoring or donating to the event, please contact the organizer for sponsorship packages or donation options. Or contact to customer support.
      </AccordionBody>
      </Accordion>
      <Accordion open={open === 6} icon={<Icon id={6} open={open} />}>
      <AccordionHeader onClick={() => handleOpen(6)} className="text-md lg:text-lg">
      How can I provide feedback or suggestions about the event?
      </AccordionHeader>
      <AccordionBody className=''>
      We welcome your feedback and suggestions! Please contact the event organizer or fill out any post-event surveys to share your thoughts and ideas.
      </AccordionBody>
      </Accordion>
      </div>
      
    </>
  );
}