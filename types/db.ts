export type Project = {
    id: string
    name: string
    description: string
    image_url: string
    created_at: string
    updated_at: string
}

export type Client = {
    id: string
    name: string
    designation: string
    description: string
    image_url: string
    created_at: string
    updated_at: string
}

export type Contact = {
    id: string
    full_name: string
    email: string
    mobile: string
    city: string
    message?: string
    created_at: string
}

export type Subscriber = {
    id: string
    email: string
    subscribed_at: string
}
