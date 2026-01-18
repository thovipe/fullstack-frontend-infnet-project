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
            <div style={{position: 'absolute', bottom: "-550px", left: 0, width: '100%' }}>
            <button onClick={()=> handlePageChange(currentPage - 1)} disabled={currentPage <= 1} style={{ width: "70px", textAlign:"center", margin:".5rem"}}>
                Previous
            </button>
            <span> Page {currentPage} of {totalPages}</span>
            <button onClick={()=> handlePageChange(currentPage + 1)} disabled={currentPage >= totalPages} style={{ width: "70px", textAlign:"center", margin:".5rem"}}>
                Next
            </button>
            </div>
        </nav>
    )
}