'use client';

import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import {useActionState} from "react";
import {searchDoc} from "../../src/actions/actions"; // Install use-debounce for a better UX
import styles from "./search.module.css"

export default function Search({ placeholder }: { placeholder: string }, ) {
    const searchParams = useSearchParams();
    const { replace } = useRouter();
    const pathname = usePathname();
    const [state, formAction] = useActionState(searchDoc, null);

    const handleSearch = useDebouncedCallback((term) => {
        const params = new URLSearchParams(searchParams);

        if (term) {
            params.set('query', term);
        } else {
            params.delete('query');
        }
        // Update the URL with the new search params
        replace(`${pathname}?${params.toString()}`);
    }, 300); // 300ms delay

    return (
        <div className={styles.searchContainer}>
            <label htmlFor="search" >
                Search :
            </label>
            <form action={formAction} className={styles.searchForm}>
            <input
                className={styles.inputSearch}
                placeholder={placeholder}
                name="search"
                onChange={(e) => {
                    handleSearch(e.target.value);
                }}
                defaultValue={searchParams.get('query')?.toString()}
            />
                <button type="submit" className={styles.searchButton}>Search</button>
            </form>
            {
                state && (
                    <div>
                        <h3>Search Results:</h3>
                        {state.content.map((item) => (
                            <div className={styles.resultContainer} key={item.id}>
                                <div className={styles.listItem}>
                                    <label>Name:</label><li>{item.name}</li>
                                    <label>Description:</label><li>{item.searchText}</li>
                                </div>
                            </div>
                                ))}

                    </div>
                )
            }
        </div>
    );
}
