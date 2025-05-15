import BaseComponent from '../components/ContentComponentBase'

export default function DocCollection() {
    return (
        <BaseComponent className="p-6 font-sans h-auto flex flex-col items-center bg-gray-50 
                    min-h-screen space-y-4">
            <h1>Em desenvolvimento</h1>
            <div className="gif-container" style={{ textAlign: 'center', marginTop: '20px' }}>
                <img 
                    src="https://media.giphy.com/media/ICOgUNjpvO0PC/giphy.gif" 
                    alt="Em desenvolvimento" 
                    style={{ maxWidth: '100%', height: 'auto' }} 
                />
            </div>
        </BaseComponent>
    );
}
