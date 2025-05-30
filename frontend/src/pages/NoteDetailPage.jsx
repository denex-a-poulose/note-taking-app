import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router'
import api from '../lib/axios'
import { ArrowLeftIcon, LoaderIcon, TrashIcon } from 'lucide-react'
import toast from 'react-hot-toast'

const NoteDetailPage = () => {
    const [note, setNote] = useState({ title: '', content: '' })
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)

    const navigate = useNavigate()
    const { id } = useParams()

    useEffect(() => {
        const fetchNote = async () => {
            try {
                const res = await api.get(`/notes/${id}`)
                setNote(res.data)
            } catch (error) {
                console.error('Error fetching the note:', error)
                toast.error('Failed to fetch the note')
            } finally {
                setLoading(false)
            }
        }

        fetchNote()
    }, [id])

    const handleDelete = async () => {
        if (!window.confirm('Are you sure you want to delete this note?')) return

        try {
            await api.delete(`/notes/${id}`)
            toast.success('Note deleted!')
            navigate('/')
        } catch (error) {
            console.error('Error deleting note:', error)
            toast.error('Failed to delete note. Try again.')
        }
    }

    const handleSave = async () => {
        if (!note.title.trim() || !note.content.trim()) {
            toast.error('Please add a title or content')
            return
        }

        setSaving(true)
        try {
            await api.put(`/notes/${id}`, {
                title: note.title,
                content: note.content,
            })
            toast.success('Note updated!')
            navigate('/')
        } catch (error) {
            console.error('Error updating note:', error)
            toast.error('Failed to update note')
        } finally {
            setSaving(false)
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-base-200 flex items-center justify-center">
                <LoaderIcon className="animate-spin size-10" />
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-base-200">
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-2xl mx-auto">
                    <div className="flex items-center justify-between mb-6">
                        <Link to="/" className="btn btn-ghost rounded-3xl">
                            <ArrowLeftIcon className="h-5 w-5" />
                            Back to Notes
                        </Link>
                        <button
                            onClick={handleDelete}
                            className="btn btn-error btn-outline rounded-3xl"
                        >
                            <TrashIcon className="h-5 w-5" />
                            Delete Note
                        </button>
                    </div>
                    <div className="card bg-base-100">
                        <div className="card-body">
                            <div className="form-control mb-4">
                                <label className="label">
                                    <span className="label-text">Title</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Note title"
                                    className="input input-bordered"
                                    value={note.title}
                                    onChange={(e) =>
                                        setNote((prev) => ({
                                            ...prev,
                                            title: e.target.value,
                                        }))
                                    }
                                />
                            </div>
                            <div className="form-control mb-4">
                                <label className="label">
                                    <span className="label-text">Content</span>
                                </label>
                                <textarea
                                    placeholder="Write your note here..."
                                    className="textarea textarea-bordered h-32"
                                    value={note.content}
                                    onChange={(e) =>
                                        setNote((prev) => ({
                                            ...prev,
                                            content: e.target.value,
                                        }))
                                    }
                                />
                            </div>
                            <div className="card-actions justify-end">
                                <button
                                    className="btn btn-primary rounded-3xl"
                                    disabled={saving}
                                    onClick={handleSave}
                                >
                                    {saving ? 'Saving...' : 'Save changes'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NoteDetailPage;
