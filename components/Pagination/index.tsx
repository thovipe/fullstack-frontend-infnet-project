'use client';

import {useRouter, useSearchParams, usePathname} from "next/navigation";

export function PaginationComponent({totalPages, currentPage}) {

    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const createPageURL = (pageNumber: number | string) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', String(pageNumber));
        return `${pathname}?${params.toString()}`;
    }

    const handlePageChange = (page: number | string) => {
        router.push(createPageURL(page));
    }
    return (
        <nav>
            <button onClick={()=> handlePageChange(currentPage - 1)} disabled={currentPage <= 1}>
                Previous
            </button>
            <span> Page {currentPage} of {totalPages}</span>
            <button onClick={()=> handlePageChange(currentPage + 1)} disabled={currentPage >= totalPages}>
                Next
            </button>
        </nav>
    )
}