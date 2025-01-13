import Image from 'next/image'

type FeaturedImageProps = {
    url: string
    alt?: string
}

export const FeaturedImage = ({ url, alt }: FeaturedImageProps) => {
    return (
        <div className="relative my-10 aspect-[4/3] overflow-hidden">
            <Image
                src={new URL(url).toString()}
                alt={alt ?? ''}
                className="object-cover"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
            />
        </div>
    )
}
