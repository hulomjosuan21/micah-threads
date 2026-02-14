import { SignupForm } from "@/forms/SignUpForm";
import logo from "@/assets/micah-logo.png";
import Image from "next/image";
import image from "@/assets/images/close-up-woman-thread.jpg";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function SignupPage() {
  return (
    <div className="grid h-svh lg:grid-cols-2">
      <div className="flex flex-col h-svh overflow-hidden">
        <div className="px-6 py-4 md:p-10">
          <div className="flex justify-center md:justify-start gap-2 font-medium items-center">
            <div className="w-12 h-12 lg:w-18 lg:h-18">
              <Image src={logo} alt="Micah Threads" />
            </div>
            Micah Threads.
          </div>
        </div>

        <div className="flex-1 min-h-0">
          <ScrollArea className="h-full">
            <div className="p-6 md:p-10">
              <div className="w-full max-w-xs mx-auto">
                <SignupForm />
              </div>
            </div>
          </ScrollArea>
        </div>
      </div>

      <div className="relative hidden lg:block h-svh">
        <Image src={image} alt="Image" fill className="object-cover" />
      </div>
    </div>
  );
}
