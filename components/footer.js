import Container from "./Container";
import { EXAMPLE_PATH } from "../lib/constants";

export default function Footer() {
    return (
        <footer className="bg-accent-1 border-t border-accent-2">
            <Container>
                <div className="py-4 flex flex-col lg:flex-row justify-between items-center">
                    <div className="text-xs lg:text-sm tracking-tighter leading-tight text-center lg:text-right mb-3 lg:mb-0">
                        Martin Rodin | 2020
                    </div>
                    <div className="text-xs lg:text-sm tracking-tighter leading-tight text-center lg:text-right mb-0 lg:mb-0">
                        Statically Generated with Next.js.
                    </div>
                </div>
            </Container>
        </footer>
    );
}
