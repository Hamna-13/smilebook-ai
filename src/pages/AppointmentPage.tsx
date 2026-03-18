import ServicesPanel from "@/components/ServicesPanel";
import ChatPanel from "@/components/ChatInterface";

const BookAppointmentPage = () => {
  return (
    <section className="h-screen overflow-hidden bg-dental-warm">
      <div className="h-full px-4 sm:px-6 py-4">
        <div className="mx-auto h-full max-w-[1600px]">
          <div className="grid h-full grid-cols-1 xl:grid-cols-[0.50fr_1.25fr] gap-4 items-stretch">
            <ServicesPanel />
            <ChatPanel />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookAppointmentPage;